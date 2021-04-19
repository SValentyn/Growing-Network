package com.growingnetwork.service;

import com.growingnetwork.exception.NonExistDataException;
import com.growingnetwork.model.DbEntity;
import com.growingnetwork.util.SmartCopyBeanUtilsBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.List;
import java.util.Optional;

public abstract class AbstractCrudService<E extends DbEntity<T>, T, R extends JpaRepository<E, T>> {
    
    public R jpaRepository;
    public SmartCopyBeanUtilsBean beanUtilsBean;
    
    public AbstractCrudService(R jpaRepository, SmartCopyBeanUtilsBean beanUtilsBean) {
        this.jpaRepository = jpaRepository;
        this.beanUtilsBean = beanUtilsBean;
    }
    
    public E create(E entity) {
        if (entity.getId() != null && jpaRepository.findById(entity.getId()).isPresent()) {
            throw new BadCredentialsException(String.format("'%s' with id '%s' already exists!", entity.getClass().getSimpleName(), entity.getId()));
        }
        return jpaRepository.save(entity);
    }
    
    public E delete(T id) {
        Optional<E> entity = jpaRepository.findById(id);
        entity.ifPresent(jpaRepository::delete);
        return resolvedOptional(entity, id);
    }
    
    public E getById(T id) {
        Optional<E> entity = jpaRepository.findById(id);
        return resolvedOptional(entity, id);
    }
    
    public List<E> getAll() {
        return jpaRepository.findAll();
    }
    
    public E update(E existingEntity) {
        return jpaRepository.save(existingEntity);
    }
    
    public E update(T id, E incomingEntity) {
        E existingEntity = getById(id);
        return update(existingEntity, incomingEntity);
    }
    
    public E update(E existingEntity, E incomingEntity) {
        try {
            beanUtilsBean.copyProperties(existingEntity, incomingEntity);
            return jpaRepository.save(existingEntity);
        } catch (ReflectiveOperationException reflectionException) {
            throw new ClassCastException(reflectionException.getMessage());
        }
    }
    
    public E resolvedOptional(Optional<E> entity, T id) {
        return entity.orElseThrow(() -> new NonExistDataException(String.format("Entity with id %s wasn't found!", id)));
    }
    
}
