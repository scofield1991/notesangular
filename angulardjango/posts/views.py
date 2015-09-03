from django.shortcuts import render
from rest_framework import permissions, viewsets, generics, status, views
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from posts.models import Post, Label, Category
from posts.permissions import IsAuthorOfPost
from posts.serializers import PostSerializer, LabelSerializer, CategorySerializer
from django.http import  Http404
from django.utils.decorators import method_decorator

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer


    def get_permissions(self):
        print(self.request.user)
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.IsAuthenticated(), IsAuthorOfPost(),)
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

class PostDetail(views.APIView):

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        note = self.get_object(pk)
        print((request.user.id))
        if request.user.id == note.user_id:
            serializer = PostSerializer(note)
            return Response(serializer.data)
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        note = self.get_object(pk)
        if request.user.id == note.user_id:
            serializer = PostSerializer(note, data=request.data, partial=True)
            print(request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, fromat=None):
        note = self.get_object(pk)
        if request.user.id == note.user_id:
            note.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)