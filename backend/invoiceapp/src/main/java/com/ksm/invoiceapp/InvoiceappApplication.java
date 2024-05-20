package com.ksm.invoiceapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class InvoiceappApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.setProperty("MONGO_URI", dotenv.get("MONGO_URI"));
		SpringApplication.run(InvoiceappApplication.class, args);
	}

}
