package com.example.appsaude.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.appsaude.model.Medicamento;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

}
