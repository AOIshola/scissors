# Generated by Django 5.0.7 on 2024-08-16 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('urlshortener', '0005_alter_url_short_url_alter_url_url_code_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='url',
            name='short_url',
            field=models.CharField(max_length=26, unique=True),
        ),
    ]
