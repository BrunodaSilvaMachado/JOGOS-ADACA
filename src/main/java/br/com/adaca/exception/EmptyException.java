package br.com.adaca.exception;

//@ResponseStatus(HttpStatus.CONFLICT)
public class EmptyException extends RuntimeException {

    public EmptyException(String message) {
        super(message);
    }

    public EmptyException() {
        super();
    }
}
