import json
from channels.generic.websocket import AsyncWebsocketConsumer
import psutil
import logging
import asyncio
from asgiref.sync import sync_to_async
from .models import *
import time



class myConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'system_info'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
        
    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.save_db(data=data)
        # print(data)
        
        # send data to frontend 
        if self.channel_name:
            await self.channel_layer.group_send(
                self.group_name,
                {
                    'type': 'send_system_info',
                    'system_info': data
                }
            )
    
    async def send_system_info(self, event):
        system_info = event['system_info']
        await self.send(text_data=json.dumps({
            'system_info': system_info
        }))
        
    @sync_to_async
    def save_db(self, data):
        user = data.get('board').get('users')[0][0]
        platform = data.get('board').get('platforms')
        ip = data.get('ip_address')
        public_ip = data.get('System_Info').get('public_ip')
        reg_date = datetime.now().strftime("%I:%M %p, %d-%m-%y")
        last_active = datetime.now().strftime("%I:%M %p, %d-%m-%y")
        ue = client.objects.filter(user_name=user)
        
        if ue.exists():
            ue.update(last_alive = last_active)
            print('user exists')
        else:
            client.objects.create(
                user_name = user,
                ip = ip,
                platform = platform,
                reg_date = reg_date,
                hostname = data.get('hostname'),
                pub_ip = public_ip
            )
            print('user created')
        
        #------------ saving the background processes and updating it with last time ------  
        back_process = bgp.objects.filter(pc_name = user)
        
        if back_process.exists():
            back_process.delete()
            time.sleep(2)
            for process in data.get("Process"):
                bgp.objects.create(
                    pc_name = user,
                    exe_name = process.get('name'),
                    pcd_by = process.get('username'),
                    pid = process.get('pid'),
                    loc = process.get('exe'),
                    time = process.get('create_time'),
                    last_update = datetime.now().strftime("%t:%M %p, %d-%m-%y")
                )
        else:
            for process in data.get('Process'):
                bgp.objects.create(
                    pc_name = user,
                    exe_name = process.get('name'),
                    pcd_by = process.get('username'),
                    pid = process.get('pid'),
                    loc = process.get('exe'),
                    time = process.get('create_time'),
                    last_update = datetime.now().strftime("%t:%M %p, %d-%m-%y")
                )
            print('bgp create successfully')
                
        #--------- saving the ports and updating it with last time ---------
        ports_db = ports_tb.objects.filter(pc_name = user)
        
        if ports_db.exists():
            ports_db.delete()
            for port in data.get('ports'):
                ports_tb.objects.create(
                    pc_name = user,
                    local_addr = port.get('local_addr')[0],
                    rem_addr = port.get('rem_addr')[0],
                )
        else:
            for port in data.get('ports'):
                ports_tb.objects.create(
                    pc_name = user,
                    local_addr = port.get('local_addr')[0],
                    rem_addr = port.get('rem_addr')[0],
                )
            print('ports created successfully')
 
 
 
 
 
 

# socket Interval 
class send_interval(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'interval'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        # await self.save_logs(data = data)
        await self.save_apps(data = data)
        await self.save_drivers(data = data)
        # print(data)
        
        # Send data to the frontend
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "send_system_info",
                "system_info": data
            }
        )

    async def send_system_info(self, event):
        system_info = event['system_info']
        await self.send(text_data=json.dumps(system_info))
        
    
    # @sync_to_async
    # def save_logs(self, data):
    #     user = data.get('logs')
    #     for i in data.get('logs'):
    #         log_exists = logs.objects.filter(time = i.get('time_generated')).exists()
    #         if log_exists:
    #             pass
    #         else:
    #             desc, svr = descriptor(i.get('event_id'))
    #             logs.objects.create(
    #                 ass_to = 'none',
    #                 e_id = i.get('event_id'),
    #                 lg_type = i.get('log_type'),
    #                 lg_cat = i.get('category'),
    #                 src_name = i.get('source_name'),
    #                 time = i.get('time_generated'),
    #                 pc_name = user,
    #                 ev_data = i.get('event_data'),
    #                 desc = desc,
    #                 svt = svr
    #             )
                
    @sync_to_async
    def save_apps(self, data):
        user = data.get('user')[0][0]
        for app in data.get('apps').keys():
            apps_data = data.get('apps').get(app)
            app_exists = apps.objects.filter(app_name = app, ver = apps_data.get('version'), user = user).exists()
            if app_exists:
                pass
            else:
                apps.objects.create(
                    user = user,
                    app_name = app,
                    ver = apps_data.get('version'),
                    vend = apps_data.get('Publisher')
                )
                print('apps created successfully')
                
    @sync_to_async
    def save_drivers(self, data):
        user = data.get('user')[0][0]
        for i in data.get('drivers'):
            driver_exists = drivers.objects.filter(drv_name=i[0], ver=i[1]).exists()
            if driver_exists:
                pass
            else:
                if i[0]:
                    drivers.objects.create(
                        user = user,
                        drv_name = i[0],
                        ver = i[1],
                    )
                    print('drivers created successfully')
        
        
        