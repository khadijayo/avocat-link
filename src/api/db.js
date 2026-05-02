import { supabase } from "../lib/supabase"

// ================= PROFILES =================
export const getProfiles = async () => {
  return await supabase.from("profiles").select("*")
}

export const createProfile = async (profile) => {
  return await supabase.from("profiles").insert([profile])
}

// ================= AVOCATS =================
export const getLawyers = async () => {
  return await supabase
    .from("avocats_details")
    .select("*")
}

export const createLawyer = async (lawyer) => {
  return await supabase
    .from("avocats_details")
    .insert([lawyer])
}

// ================= APPOINTMENTS =================
export const getAppointments = async () => {
  return await supabase.from("appointments").select("*")
}

export const createAppointment = async (appointment) => {
  return await supabase
    .from("appointments")
    .insert([appointment])
}

// ================= PAYMENTS =================
export const getPayments = async () => {
  return await supabase.from("payments").select("*")
}

export const createPayment = async (payment) => {
  return await supabase
    .from("payments")
    .insert([payment])
}

// ================= REVIEWS =================
export const getReviews = async () => {
  return await supabase.from("reviews").select("*")
}

export const createReview = async (review) => {
  return await supabase
    .from("reviews")
    .insert([review])
}