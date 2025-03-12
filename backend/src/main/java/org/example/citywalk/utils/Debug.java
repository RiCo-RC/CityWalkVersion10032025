package org.example.citywalk.utils;

import java.util.List;

public class Debug {

    private String message;
    private boolean isModeDev = true;

    public Debug() {
    }

    public Debug(String message, boolean isModeDev) {
        this.message = message;
        this.isModeDev = isModeDev;
    }

    public void log(String message) {
        if (isModeDev) System.out.println(message);
    }

    public <T> void loop(List<T> elements, String message) {
        this.log(message);
        if (isModeDev) {
            for (T element : elements) {
                this.log(element.toString());
            }
        }
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isModeDev() {
        return isModeDev;
    }

    public void setModeDev(boolean modeDev) {
        isModeDev = modeDev;
    }
}
