from django.urls import path
from . import views

urlpatterns = [
    #as_view transforma una vista de clase a una funcional
    path("notes/", views.CreateNoteView.as_view(), name = "note-list"),
    path("notes/delete/<int:pk>", views.NoteDelete.as_view(), name = "delete-note")

]