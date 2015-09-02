from django.db import models
from authentication.models import Account
from mptt.models import MPTTModel, TreeForeignKey

class Label(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Category(MPTTModel):
    name = models.CharField(max_length=50, unique=True)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True)

    def __str__(self):
        return self.name

    class MPTTMeta:
        order_insertion_by = ['name']


class Post(models.Model):
    author = models.ForeignKey(Account, null=True)
    name = models.CharField(max_length=200)
    content = models.TextField()
    labels = models.ManyToManyField(Label, blank=True, null=True)
    category = models.ManyToManyField(Category)


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{0}'.format(self.content)
