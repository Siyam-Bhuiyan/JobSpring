package com.jobspring.enums;

public enum Role {
    user, recruiter, admin;

    public static boolean isValid(String v) {
        if (v == null) return false;
        for (Role r : Role.values()) {
            if (r.name().equalsIgnoreCase(v)) return true;
        }
        return false;
    }

    public static String normalize(String v) {
        return v == null ? null : v.toLowerCase();
    }
}
