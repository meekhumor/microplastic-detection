from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import MicroplasticReading, MonitoringLocation
from .serializers import ReadingSerializer

class DeviceDataViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def upload_reading(self, request):
        data = request.data
        try:
            location = MonitoringLocation.objects.get(
                id=data.get('location_id')
            )
            reading = MicroplasticReading.objects.create(
                location=location,
                concentration=data.get('concentration'),
                temperature=data.get('temperature'),
                ph_level=data.get('ph_level'),
                recorded_at=timezone.now(),
                device_id=data.get('device_id')
            )
            return Response({'status': 'success', 'id': reading.id})
        except Exception as e:
            return Response(
                {'status': 'error', 'message': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )