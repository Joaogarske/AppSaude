package com.example.appsaude.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appsaude.model.CadMedicamento;
import com.example.appsaude.model.User;
import com.example.appsaude.repository.CadMedicamentoRepository;

@Service
public class CadMedicamentoService {

    @Autowired
    private CadMedicamentoRepository cadMedicamentoRepository;

    public void registerMedicamento(CadMedicamento medicamento) {
        cadMedicamentoRepository.save(medicamento);
    }

    public List<CadMedicamento> getAllMedicamentos(User user) {
        return cadMedicamentoRepository.findByUser(user);
    }

    public void updateMedicamento(CadMedicamento medicamento) {
        cadMedicamentoRepository.save(medicamento);
    }

    public void deleteMedicamento(Long id) {
        cadMedicamentoRepository.deleteById(id);
    }
}