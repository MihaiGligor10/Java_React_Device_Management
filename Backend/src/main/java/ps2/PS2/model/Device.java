package ps2.PS2.model;


import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
@EqualsAndHashCode
public class Device {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
   // @UniqueElements
    private String name;
    private String location;
    @Column(length = 65555)
    private String description;
    private int maxConsumption;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Measurement> measurementList = new ArrayList<>();


    public Device(String name, String location, String description, int maxConsumption) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.maxConsumption = maxConsumption;
    }


    public Device(int i, String s, String s1, String s2, int i1) {
    }
}
