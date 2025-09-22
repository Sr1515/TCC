from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Result, Player, Session
from decimal import Decimal
from django.core.exceptions import ValidationError

GLOBAL_ACTIONS = {
    "player comprou wifi": {"time_management": Decimal("4.00")},
    "player concluiu robo": {"time_management": Decimal("15.00")},
    "player falhou em concluir robo": {"time_management": Decimal("-5.00")},
    "trabalho no pc concluido": {"teamwork": Decimal("4.00")},
    "computador explodiu": {"communication": Decimal("4.00")},
    "player morreu": {"communication": Decimal("0.00")},
    "mapa escureceu": {"time_management": Decimal("0.00")},
    "mapa voltou ao normal": {"time_management": Decimal("0.00")},
    "player comprou cafe": {"time_management": Decimal("4.00")},
}

PLAYER_ACTIONS = {
    "player consertou pc": {"communication": Decimal("8.00")},
    "player trabalhando no pc": {"teamwork": Decimal("3.00")},
    "player comprou item medkit": {"teamwork": Decimal("7.00")},
    "player comprou item toolkit": {"teamwork": Decimal("5.00")},
    "player comprou item cpu": {"time_management": Decimal("3.30")},
    "player comprou item gpu": {"time_management": Decimal("3.30")},
    "player comprou item ram": {"time_management": Decimal("3.30")},
    "player comprou item hd": {"time_management": Decimal("3.30")},
    "player comprou item ssd": {"time_management": Decimal("5.00")},
    "player pegou pendrive no deployer": {"time_management": Decimal("6.00")},
    "player comprou item usb_stick": {"communication": Decimal("2.00")},
    "player curou outro player": {"communication": Decimal("7.00")},
    "player atualizou computador aleatorio": {"time_management": Decimal("3.30")},
}

def get_action_points(action_type: str, rules: dict):
    action_type = action_type.lower().strip()
    points = rules.get(action_type)
    if points is None:
        print(f"[WARN] Ação '{action_type}' não encontrada nas regras.")
    return points or {}

@receiver(post_save, sender=Result)
def calculate_player_metrics(sender, instance, created, **kwargs):
    session = instance.session

    if session.status == "concluida":
        raise ValidationError("Não é possível salvar outro resultado para uma sessão já concluída.")

    if not created:
        return

    batch_data = instance.data

    players = {str(p.player_code): p for p in session.players.all()}

    scores = {
        player_code: {
            "teamwork": Decimal("0.00"),
            "communication": Decimal("0.00"),
            "time_management": Decimal("0.00"),
        }
        for player_code in players
    }

    print("\n[DEBUG] Estado inicial dos players (zerado):")
    for pcode, values in scores.items():
        print(f"  Player {pcode} -> {values}")

    # Processa cada evento do batch
    for event in batch_data:
        for actor_code_raw, action in event.items():
            actor_code = str(actor_code_raw)
            action_name = action.get("action", "").strip().lower()

            print(f"[DEBUG] Evento recebido: actor_code={actor_code}, action={repr(action_name)}")

            global_points = get_action_points(action_name, GLOBAL_ACTIONS)
            
            if global_points:
                print(f"[GLOBAL] Ação: '{action_name}' | Pontos: {global_points}")
                for pcode in scores:
                    for metric, points in global_points.items():
                        scores[pcode][metric] += points
                continue  

            if actor_code not in players:
                print(f"[SYSTEM] Ignorando ação do sistema ou player desconhecido: actor_code={actor_code}, action={action_name}")
                continue

            player_points = get_action_points(action_name, PLAYER_ACTIONS)
            if player_points:
                print(f"[INDIVIDUAL] Player {actor_code} executou '{action_name}' | Pontos: {player_points}")
                for metric, points in player_points.items():
                    scores[actor_code][metric] += points
            else:
                print(f"[INFO] Ação não reconhecida individualmente: '{action_name}'")

    print("\n[DEBUG] Estado final e atualizações:")
    for pcode, values in scores.items():
        final_score = (
            values["teamwork"] +
            values["communication"] +
            values["time_management"]
        )

        print(f"  Player {pcode} -> Teamwork: {values['teamwork']}, "
              f"Communication: {values['communication']}, "
              f"Time Management: {values['time_management']}, "
              f"Score Final: {final_score}")

        player = players[pcode]
        player.teamwork = values["teamwork"]
        player.communication = values["communication"]
        player.time_management = values["time_management"]
        player.score = final_score
        player.save(update_fields=["teamwork", "communication", "time_management", "score"])

    session.status = "concluida"
    session.save(update_fields=["status"])
    print(f"\n[DEBUG] Sessão {session.id} marcada como concluída.\n")
