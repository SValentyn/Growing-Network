package com.growingnetwork.mapper;

import com.growingnetwork.model.DbEntity;
import com.growingnetwork.service.AbstractCrudService;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractControllerToCrudServiceMapper<E extends DbEntity<T>, T, I, O, S extends AbstractCrudService<E, T, ?>> {
    
    public ModelMapper modelMapper;
    public S crudService;
    
    public AbstractControllerToCrudServiceMapper(ModelMapper modelMapper, S crudService) {
        this.modelMapper = modelMapper;
        this.crudService = crudService;
    }
    
    public O getById(T id) {
        return responseDtoOf(crudService.getById(id));
    }
    
    public List<O> getAll() {
        return crudService.getAll().stream()
                .map(this::responseDtoOf)
                .collect(Collectors.toList());
    }
    
    public O create(I dtoIn) {
        E entity = entityOf(dtoIn);
        return responseDtoOf(crudService.create(entity));
    }
    
    public O update(T id, I dtoIn) {
        E entity = entityOf(dtoIn);
        return responseDtoOf(crudService.update(id, entity));
    }
    
    public O delete(T id) {
        return responseDtoOf(crudService.delete(id));
    }
    
    abstract O responseDtoOf(E entity);
    
    abstract E entityOf(I dtoIn);
    
}
