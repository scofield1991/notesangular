# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20150902_0930'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='color',
            field=models.CharField(max_length=20, default='#FFF'),
        ),
    ]
