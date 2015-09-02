from django.shortcuts import render
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from posts.models import Post, Label, Category
from posts.permissions import IsAuthorOfPost
from posts.serializers import PostSerializer, LabelSerializer, CategorySerializer
from django.utils.decorators import method_decorator

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer


    def get_permissions(self):
        print(self.request.user)
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfPost(),)

    def perform_create(self, serializer):
        print(self.request.user)
        instance = serializer.save(author=self.request.user)

        return super(PostViewSet, self).perform_create(serializer)

class AccountPostsViewSet(viewsets.ViewSet):
    queryset = Post.objects.select_related('author').all()
    serializer_class = PostSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)


        return Response(serializer.data)

class LabelViewSet(viewsets.ModelViewSet):
        queryset = Label.objects.all()
        serializer_class = LabelSerializer


        def get_permissions(self):
            if self.request.method in permissions.SAFE_METHODS:
                return (permissions.AllowAny(),)
            return (permissions.IsAuthenticated(),)

class CategoryViewSet(viewsets.ModelViewSet):
        queryset = Category.objects.all()
        serializer_class = CategorySerializer


        def get_permissions(self):
            if self.request.method in permissions.SAFE_METHODS:
                return (permissions.AllowAny(),)
            return (permissions.IsAuthenticated(),)
