from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

#헬퍼 클래스
class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError('must have user email')
        user = self.model(
            email = email
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 관리자 user 생성
    def create_superuser(self, email=None, password=None, **extra_fields):
        superuser = self.create_user(
            email = email,
            password=password,
        )
            
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True
        
        superuser.save(using=self._db)
        return superuser

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=30, null=False, blank=False, unique=True)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    # 헬퍼 클래스 사용, 위에서 만들어 둔 거
    objects = UserManager()

    # 사용자의 username field는 nickname으로 설정
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

