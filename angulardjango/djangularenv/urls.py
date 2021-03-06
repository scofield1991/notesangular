"""djangularenv URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url, patterns
from django.contrib import admin
from rest_framework import routers
from rest_framework_nested import routers
from authentication.views import AccountViewSet, IndexView, LoginView, LogoutView
from posts.views import AccountPostsViewSet, PostViewSet, LabelViewSet, CategoryViewSet, PostDetail

#url(r'^notes/(?P<pk>[0-9]+)/$', views.NoteDetail.as_view()),

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)
router.register(r'labels', LabelViewSet)
router.register(r'category', CategoryViewSet)
accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    # url(r'^api/v1/accounts', AccountViewSet.as_view({
    #     'get': 'list',
    #     'post': 'create'
    #     }), name='account'),
    url(r'^posts/(?P<pk>[0-9]+)/$', PostDetail.as_view()),
     url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^.*$', IndexView.as_view(), name='index'),
]
