# Generated by Django 4.1.2 on 2022-12-28 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('globalMaster', '0010_fee_feeinrs_fee_particulars'),
    ]

    operations = [
        migrations.AddField(
            model_name='handledby',
            name='aadharNo',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='handledby',
            name='phoneNo',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
