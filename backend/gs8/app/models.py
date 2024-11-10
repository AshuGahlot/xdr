from django.db import models
from django.utils import timezone
from datetime import datetime
# Create your models here.



class client(models.Model):
    user_name = models.CharField(max_length=200)
    ip = models.CharField(max_length=200, null=True)
    platform = models.CharField(max_length=200, null=True)
    reg_date = models.CharField(max_length=200, null=True)
    
    hostname = models.CharField(max_length=200, null=True)
    pub_ip = models.CharField(max_length=200, null=True, default='none')
    ver = models.CharField(max_length=200, null=True)
    last_alive = models.CharField(max_length=200, null=True)
    action = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return f"{self.user_name}, {self.ip}, {self.hostname}"


class logs(models.Model):
    ass_to = models.CharField(max_length=200, default='none', null=True)
    e_id = models.IntegerField()
    lg_type = models.CharField(max_length=200)
    lg_cat = models.IntegerField()
    svt = models.CharField(max_length=200) # critical, high, medium, low, info
    desc = models.CharField(max_length=1000, default='none')
    src_name = models.CharField(max_length=1000)
    time = models.CharField(max_length=500)
    pc_name = models.CharField(max_length=200, default='none')
    ev_data = models.TextField()
    
    def __str__(self):
        return f'{self.e_id}, {self.lg_type}, {self.time}, {self.pc_name}, {self.desc}'
    
    

class bgp(models.Model):
    ass_to = models.CharField(max_length=200, default='none')
    pc_name = models.CharField(max_length=200)
    exe_name = models.CharField(max_length=200, null=True, default='none')
    pid = models.IntegerField()
    pcd_by = models.CharField(max_length=200, null=True, default='none')
    time = models.CharField(max_length=200, null=True, default='none')
    loc = models.CharField(max_length=200, null=True, blank=True)
    
    last_update = models.CharField(max_length=200, default=datetime.now().strftime("%I:%M %p, %d-%m-%y"))
    action = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return f"{self.last_update}"


class apps(models.Model):
    user = models.CharField(max_length=200)
    app_name = models.CharField(max_length=300, default='none')
    ver = models.CharField(max_length=100, null=True, default='none')
    vend = models.CharField(max_length=300, null=True, default='none')
    
    def __str__(self):
        return f'{self.app_name}, {self.ver}, {self.vend}'
    
    
    
class drivers(models.Model):
    user = models.CharField(max_length=200)
    drv_name = models.CharField(max_length=400)
    ver = models.CharField(max_length=200, null=True, default='none')
    
    def __str__(self):
        return f'{self.user}, {self.drv_name}, {self.ver}'
    
    
# class entrydes(models.Model):
#     evt_id = models.IntegerField()
#     svr = models.CharField(max_length=200)
#     log_des = models.CharField(max_length=1000)
    
#     def __str__(self):
#         return f'{self.evt_id}, {self.log_des}'
    
    
class app_ver(models.Model):
    app_name = models.CharField(max_length=300, default='Not Available')
    new_ver = models.CharField(max_length=100, null=True, default='Not Available')
    
    def __str__(self):
        return f'{self.app_name}, {self.new_ver}'


class ports_tb(models.Model):
    pc_name = models.CharField(max_length=200)
    local_addr = models.CharField(max_length=200, default='Not Available')
    rem_addr = models.CharField(max_length=200, default='Not Available')
    last_update = models.DateField(max_length=100, default=datetime.now())
    
    def __str__(self):
        return f"{self.last_update}"