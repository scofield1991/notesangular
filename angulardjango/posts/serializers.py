__author__ = 'user'
from rest_framework import serializers
from authentication.serializers import AccountSerializer
from posts.models import Post, Label, Category

class PostSerializer(serializers.ModelSerializer):
    author = AccountSerializer(required=False, read_only=True)

    class Meta:
        model = Post

        fields = ('id', 'author', 'content','name','labels', 'category', 'created_at', 'updated_at', 'color')
        read_only_fields = ('id', 'created_at', 'updated_at')

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(PostSerializer, self).get_validation_exclusions()

            return exclusions + ['author']

class LabelSerializer(serializers.ModelSerializer):

    class Meta:
            model = Label

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
            model = Category
