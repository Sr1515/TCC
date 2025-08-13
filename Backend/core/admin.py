from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Game, Player, Result, Session
from django.core.exceptions import ValidationError

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ("is_active","is_staff","is_superuser")}),
        ('Permissions', {'fields': ('user_permissions',)}),
        ('Important dates', {'fields': ()}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','username', 'password1', 'password2'),
        }),
    )

    list_display = ('username', 'email', 'created_at', 'updated_at')
    list_filter = tuple()
    search_fields = ('username', 'email')
    ordering = ('username',)

class GameAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

class PlayerAdmin(admin.ModelAdmin):
    list_display = ('player_name', 'player_code', 'session', 'score', 'teamwork', 'communication', 'time_management')
    
    def save_model(self, request, obj, form, change):
        try:
            obj.full_clean()
            super().save_model(request, obj, form, change)
        except ValidationError as error:
            self.message_user(request, f'{str(error)}', messages.ERROR)
        

class ResultAdmin(admin.ModelAdmin):
    list_display = ('session', 'data')

class SessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'session_code', 'organizer', 'game', 'max_participantes')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Game, GameAdmin)
admin.site.register(Player, PlayerAdmin)
admin.site.register(Result, ResultAdmin)
admin.site.register(Session, SessionAdmin)