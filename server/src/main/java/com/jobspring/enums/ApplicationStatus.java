package com.jobspring.enums;

public enum ApplicationStatus {
    applied, accepted, rejected;

    public static boolean isValid(String v) {
        if (v == null) return false;
        for (ApplicationStatus s : values()) {
            if (s.name().equalsIgnoreCase(v.replace(' ', '_'))) return true;
        }
        return false;
    }

    public static String normalize(String v) {
        return v == null ? null : v.toLowerCase().replace(' ', '_');
    }
}
