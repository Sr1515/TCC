# Generated by Django 5.1.7 on 2025-05-09 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_rename_batchesresults_batchresult'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='duration',
            field=models.IntegerField(choices=[(2, '2 minutos'), (4, '4 minutos'), (6, '6 minutos')], default=2),
        ),
    ]
