package ps2.PS2.service.impl;

import org.springframework.stereotype.Service;
import ps2.PS2.dto.ChartInfoDTO;
import ps2.PS2.dto.ChartInit;
import ps2.PS2.model.Device;
import ps2.PS2.model.Measurement;
import ps2.PS2.repository.DeviceRepository;
import ps2.PS2.repository.MeasurementRepository;
import ps2.PS2.service.MeasurementService;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

@Service
public class MeasurementServiceImpl implements MeasurementService {

    private final DeviceRepository deviceRepository;
    private final MeasurementRepository measurementRepository;

    public MeasurementServiceImpl(DeviceRepository deviceRepository, MeasurementRepository measurementRepository) {
        this.deviceRepository = deviceRepository;
        this.measurementRepository = measurementRepository;
    }

    @Override
    public void generateMeasurements(int deviceId) {

        Device device;
        System.out.println("intra in functie");
        if(deviceRepository.findById(deviceId)==null)
        {
            System.out.println("device not found");
            return;
        }
        else
        {
            device = deviceRepository.findById(deviceId);
            System.out.println("gaseste device");
        }
        List<Measurement> list = device.getMeasurementList();

        Random random = new Random();
        int value ;
        System.out.println("inainte de for");
        for(int i = 0 ; i<8 ;i++)
        {
            value = random.nextInt(100);
            Measurement m = new Measurement(value , Timestamp.valueOf(LocalDateTime.now().minusHours(i)));
            measurementRepository.save(m);
            list.add(m);
        }
        System.out.println("trece de for");

        device.setMeasurementList(list);
        deviceRepository.save(device);

    }

    @Override
    public boolean isSameDay(Timestamp t1, Timestamp t2) {
        Calendar calendar1 = Calendar.getInstance();
        calendar1.setTime(t1);
        Calendar calendar2 = Calendar.getInstance();
        calendar2.setTime(t2);
        return calendar1.get(Calendar.YEAR) == calendar2.get(Calendar.YEAR)
                && calendar1.get(Calendar.MONTH) == calendar2.get(Calendar.MONTH)
                && calendar1.get(Calendar.DAY_OF_MONTH) == calendar2.get(Calendar.DAY_OF_MONTH);    }

    @Override
    public List<ChartInfoDTO> generateDataForChart(ChartInit dto) {
       Device d=deviceRepository.findById(dto.getDevice());
       List<Measurement> m=d.getMeasurementList();
       List<ChartInfoDTO> returnList = new ArrayList<>();
        for (Measurement measurement : m) {
            if (isSameDay(dto.getT(), measurement.getTime())) {
                returnList.add(new ChartInfoDTO(measurement.getTime().getHours(), measurement.getValueConsumed()));
            }
        }
        System.out.println(returnList);
        return returnList;

    }
}
