from django.urls import path
from . import views

urlpatterns = [
    path('note/', views.NoteListView.as_view(), name='note-list'),
    # path('note/create/', views.NoteCreateView.as_view(), name='note-create'),
    path('note/delete/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'),
]