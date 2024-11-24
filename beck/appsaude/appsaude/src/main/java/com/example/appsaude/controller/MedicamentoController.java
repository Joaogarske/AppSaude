package com.example.appsaude.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.appsaude.model.Medicamento;
import com.example.appsaude.service.MedicamentoService;

@RestController
@RequestMapping("/api/medicamentos")
public class MedicamentoController {
	
	@Autowired
	private MedicamentoService medicamentoService;
	
	@PostMapping
	public ResponseEntity<Medicamento> salvar(@RequestBody Medicamento medicamento) {
        return ResponseEntity.ok(medicamentoService.salvar(medicamento));
    }
	
	 @GetMapping
	    public ResponseEntity<List<Medicamento>> buscarTodos() {
	        return ResponseEntity.ok(medicamentoService.buscarTodos());
	    }
}
