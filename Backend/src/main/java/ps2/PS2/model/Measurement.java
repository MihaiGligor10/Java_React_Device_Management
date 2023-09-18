package ps2.PS2.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
@EqualsAndHashCode
public class Measurement {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id ;
    private int valueConsumed;
    private Timestamp time;


    public Measurement(int valueConsumed, Timestamp time) {
        this.valueConsumed = valueConsumed;
        this.time = time;
    }
}
