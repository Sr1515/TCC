from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import BatchesResults, Player
from decimal import Decimal

@receiver(post_save, sender=BatchesResults)
def calculate_player_metrics(sender, instance, created, **kwargs):
    
    if created: 
        session = instance.session
        batch_data = instance.data

        for player in session.players.all():

            teamwork_score = Decimal('0.00')    
            communication_score = Decimal('0.00')  
            time_management_score = Decimal('0.00') 
            
            current_teamwork = player.teamwork
            current_communication = player.communication
            current_time_management = player.time_management
            current_score = player.score

            for action in batch_data.get(str(player.id), []):
                action_type = action['action']

                if 'botão vermelho' in action_type.lower():
                    teamwork_score += Decimal('0.10')
                
                if 'botão azul' in action_type.lower():
                    communication_score += Decimal('0.50')

                if 'botão amarelo' in action_type.lower():
                    time_management_score += Decimal('1.00')

            player.teamwork = current_teamwork + teamwork_score
            player.communication = current_communication + communication_score
            player.time_management = current_time_management + time_management_score

            player_score = player.teamwork + player.communication + player.time_management

            Player.objects.filter(id=player.id).update(
                teamwork=player.teamwork,
                communication=player.communication,
                time_management=player.time_management,
                score=player_score  
            )
