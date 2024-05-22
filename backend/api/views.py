from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializer import UserSerializer, noteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    # Hace una query a la tabla usuario para revisar que no esten repetidos los campos unicos.
    queryset = User.objects.all()
    # Serialiazer es puerta de entrada a la solicitud para manipular y validar datos.
    serializer_class = UserSerializer
    #Permiision classes maneja quien puede entrar a la vista de la api
    permission_classes = [AllowAny] 


class CreateNoteView(generics.ListCreateAPIView):
    serializer_class = noteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Trae el usuario actual
        user = self.request.user
        return Note.objects.filter(author = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            # Pasamos author manualmente dado que definimos en el serailzier que seria
            # -> read only
            serializer.save(author=self.request.user)
        else: 
            print(serializer.errors)
            return 
    
class NoteDelete(generics.DestroyAPIView):
    serializer_class = noteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Trae el usuario actual
        user = self.request.user
        return Note.objects.filter(author = user)
    

