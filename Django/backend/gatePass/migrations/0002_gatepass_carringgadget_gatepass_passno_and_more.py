# Generated by Django 4.0.3 on 2023-01-24 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gatePass', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gatepass',
            name='carringGadget',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='gatepass',
            name='passNo',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='address',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='allowingEntryinLicanceArea',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='idNo',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='inTime',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='noOfPerson',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='outTime',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='permittedBy',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='personToMeet',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='pourpose',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='gatepass',
            name='typeOf',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
