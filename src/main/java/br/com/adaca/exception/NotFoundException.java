package br.com.adaca.exception;

//@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {

    public NotFoundException(String exception) {
        super(exception);
    }
}