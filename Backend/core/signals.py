from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Result, Player, Session
from decimal import Decimal

GLOBAL_ACTIONS = {
    "player comprou wifi": {"time_management": Decimal("0.40")},
    "player concluiu robo": {"time_management": Decimal("1.50")},
    "player falhou em concluir robo": {"time_management": Decimal("-0.50")},
    "trabalho no pc concluido": {"teamwork": Decimal("0.40")},
    "computador explodiu": {"communication": Decimal("0.00")},
    "player morreu": {"communication": Decimal("0.00")},
    "mapa escureceu": {"time_management": Decimal("0.00")},
    "mapa voltou ao normal": {"time_management": Decimal("0.00")},
    "player comprou cafe": {"time_management": Decimal("0.40")},
}

PLAYER_ACTIONS = {
    "player consertou pc": {"communication": Decimal("0.80")},
    "player trabalhando no pc": {"teamwork": Decimal("0.30")},
    "player comprou medkit": {"teamwork": Decimal("0.70")},
    "player comprou toolkit": {"teamwork": Decimal("0.50")},
    "player comprou cpu": {"time_management": Decimal("0.30")},
    "player comprou gpu": {"time_management": Decimal("0.30")},
    "player comprou ram": {"time_management": Decimal("0.30")},
    "player comprou hd": {"time_management": Decimal("0.30")},
    "player comprou ssd": {"time_management": Decimal("0.50")},
    "player pegou pendrive no deployer": {"time_management": Decimal("0.60")},
    "player curou player": {"communication": Decimal("1.00")},
    "player atualizou computador aleatorio": {"time_management": Decimal("0.30")},
}

def get_action_points(action_type: str, rules: dict):
    action_type = action_type.lower()
    for key, points in rules.items():
        if key in action_type:
            return points
    return {}

@receiver(post_save, sender=Result)
def calculate_player_metrics(sender, instance, created, **kwargs):
    if not created:
        return

    session = instance.session
    batch_data = instance.data

    players = {p.player_code: p for p in session.players.all()}

    scores = {
        player_code: {
            "teamwork": player.teamwork,
            "communication": player.communication,
            "time_management": player.time_management,
        }
        for player_code, player in players.items()
    }

    print("\n[DEBUG] Estado inicial dos players:")
    for pcode, values in scores.items():
        print(f"  Player {pcode} -> {values}")

    for event in batch_data:
        for actor_code, action in event.items():
            
            if actor_code not in players:
                print(f"[SYSTEM] Ignorando ação do sistema: actor_code={actor_code}, action={action['action']}")
                continue

            action_name = action["action"]
            print(f"[DEBUG] Evento recebido: actor_code={actor_code}, action={action_name}")

            global_points = get_action_points(action_name, GLOBAL_ACTIONS)
            if global_points:
                print(f"[GLOBAL] Ação: '{action_name}' | Pontos: {global_points}")
                for pcode in scores:
                    for metric, points in global_points.items():
                        scores[pcode][metric] += points
                continue

            player_points = get_action_points(action_name, PLAYER_ACTIONS)
            if player_points:
                print(f"[INDIVIDUAL] Player {actor_code} executou '{action_name}' | Pontos: {player_points}")
                for metric, points in player_points.items():
                    scores[actor_code][metric] += points
            else:
                print(f"[INFO] Ação não reconhecida: '{action_name}'")

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
