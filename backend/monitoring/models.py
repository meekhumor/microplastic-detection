from django.db import models
from django.contrib.auth.models import User

class MonitoringLocation(models.Model):
    name = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

class MicroplasticReading(models.Model):
    location = models.ForeignKey(MonitoringLocation, on_delete=models.CASCADE)
    concentration = models.FloatField()  # μg/L
    temperature = models.FloatField(null=True, blank=True)
    ph_level = models.FloatField(null=True, blank=True)
    recorded_at = models.DateTimeField()
    device_id = models.CharField(max_length=100, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    class Meta:
        ordering = ['-recorded_at']

class Alert(models.Model):
    ALERT_TYPES = [
        ('HIGH', 'High Concentration'),
        ('CRITICAL', 'Critical Level'),
        ('DEVICE', 'Device Malfunction'),
    ]
    
    location = models.ForeignKey(MonitoringLocation, on_delete=models.CASCADE)
    alert_type = models.CharField(max_length=10, choices=ALERT_TYPES)
    message = models.TextField()
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)