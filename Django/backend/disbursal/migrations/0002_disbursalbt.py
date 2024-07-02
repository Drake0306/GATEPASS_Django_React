# Generated by Django 4.1.2 on 2022-11-06 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disbursal', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='disbursalBT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bankName', models.CharField(blank=True, max_length=250, null=True)),
                ('branchName', models.CharField(blank=True, max_length=250, null=True)),
                ('date', models.CharField(blank=True, max_length=250, null=True)),
                ('transNo', models.CharField(blank=True, max_length=250, null=True)),
                ('customerName', models.CharField(blank=True, max_length=250, null=True)),
                ('phoneNo', models.CharField(blank=True, max_length=250, null=True)),
                ('address', models.CharField(blank=True, max_length=250, null=True)),
                ('collectionDate', models.CharField(blank=True, max_length=250, null=True)),
                ('docSentToBankDate', models.CharField(blank=True, max_length=250, null=True)),
                ('sentAt', models.CharField(blank=True, max_length=250, null=True)),
                ('caseClose', models.CharField(blank=True, max_length=250, null=True)),
                ('loanTakenFrom', models.CharField(blank=True, max_length=250, null=True)),
                ('propertyDetails', models.CharField(blank=True, max_length=250, null=True)),
                ('handledBy', models.CharField(blank=True, max_length=250, null=True)),
                ('applicationNo', models.CharField(blank=True, max_length=250, null=True)),
                ('remarks', models.CharField(blank=True, max_length=250, null=True)),
                ('otherRemarkIfAny', models.CharField(blank=True, max_length=250, null=True)),
                ('chequeDate', models.CharField(blank=True, max_length=250, null=True)),
                ('amount', models.CharField(blank=True, max_length=250, null=True)),
                ('chequeReceivedDate', models.CharField(blank=True, max_length=250, null=True)),
                ('chequeReturnDate', models.CharField(blank=True, max_length=250, null=True)),
                ('status', models.CharField(default='true', max_length=250)),
            ],
        ),
    ]
