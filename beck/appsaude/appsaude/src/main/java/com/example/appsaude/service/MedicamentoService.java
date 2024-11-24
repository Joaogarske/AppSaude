package com.example.appsaude.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appsaude.model.Medicamento;
import com.example.appsaude.repository.MedicamentoRepository;

@Service
public class MedicamentoService {
    @Autowired
    private MedicamentoRepository repository;

    public Medicamento salvar(Medicamento medicamento) {
        return repository.save(medicamento);
    }

    public List<Medicamento> buscarTodos() {
        return repository.findAll();
    }
}
