# Generated by Django 4.0.3 on 2023-02-16 11:03

from django.db import migrations
import django_base64field.fields


class Migration(migrations.Migration):

    dependencies = [
        ('gatePass', '0006_alter_gatepass_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gatepass',
            name='thumbImage',
            field=django_base64field.fields.Base64Field(blank=True, default='', max_length=900000, null=True),
        ),
    ]
