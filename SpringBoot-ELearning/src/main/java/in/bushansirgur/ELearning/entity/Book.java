package in.bushansirgur.onlinebookstore.entity;


import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="tbl_video")
@Setter
@Getter
@ToString
public class Book{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	private String name;
	
	private String description;
	

	@Column(name="image_url")
	private String imageUrl;
	

	@ManyToOne
	@JoinColumn(name="category_id", nullable=false)
	private BookCategory category;
	
	//add setters and getters
	//if you are not using lombok
}
