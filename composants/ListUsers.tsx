"use client"

import { UserType } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"

function ListUsers() {
  const [listUser, setListUser] = useState<UserType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return
    GetListUser()
  }, [])

  const GetListUser = async () => {
    try {
      const serveur = process.env.NEXT_PUBLIC_SERVEUR_URL || null

      if (!serveur) {
        console.log("L'url du serveur est manquant")
        setIsLoading(false)
        return
      }

      const req = await axios.get(`${process.env.NEXT_PUBLIC_SERVEUR_URL}/users`)
      const users = Array.isArray(req.data) ? req.data : req.data?.users ?? []
      setListUser(users)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-rose-50 via-stone-50 to-sky-50 px-4 py-10 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-rose-400">
            Gestion
          </p>
          <h3 className="text-3xl font-semibold text-slate-800 md:text-4xl">
            Liste des utilisateurs
          </h3>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"> {/*Array.from({ length: 6 }).map((_, index)  */}
            {listUser.map((user,index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-rose-100 bg-white/80 p-5 shadow-[0_10px_30px_rgba(251,113,133,0.08)]"
              >
                <div className="mb-4 h-4 w-20 rounded-full bg-rose-100" />
                <div className="mb-3 h-6 w-2/3 rounded-full bg-slate-100" />
                <div className="mb-2 h-4 w-full rounded-full bg-slate-100" />
                <div className="h-4 w-5/6 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        ) : listUser.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-rose-200 bg-white/70 px-6 py-12 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <p className="text-lg font-medium text-slate-500">Aucun utilisateur trouvé.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {listUser.map((user) => (
              <article
                key={user.id ?? `${user.email}-${user.username}`}
                className="group rounded-3xl border border-rose-100 bg-white/80 p-5 shadow-[0_12px_35px_rgba(148,163,184,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(251,113,133,0.15)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-rose-200 to-pink-100 text-lg font-semibold text-rose-700 shadow-inner">
                    {(user.name ?? user.username ?? "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
                    Actif
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Nom</p>
                    <h4 className="mt-1 text-xl font-semibold text-slate-800">
                      {user.name ?? user.username ?? "Utilisateur"}
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-500">Login :</span> {user.username ?? "-"}
                    </p>
                    <p className="mt-1">
                      <span className="font-medium text-slate-500">Email :</span> {user.email ?? "-"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600 ">
                    
                      <span className="font-medium text-slate-900 mb-3">Adresse :</span> 
                      <ul>
                        <li>- {user.address.street ?? "-"}</li>
                        <li>- {user.address.suite ?? "-"}</li>
                        <li>- {user.address.city ?? "-"}</li>
                        <li>- {user.address.zipcode ?? "-"}</li>
                        <li> Géo : {user.address.geo.lat ?? "-"} / {user.address.geo.lng ?? "-"}</li>
                      </ul>
                    
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600 col-span-2">
                    
                      <span className="font-medium text-slate-900 pb-5">Entreprise :</span> 
                      <ul>
                        <li><span className="text-md text-slate-700">Nom :</span> {user.company.name ?? "-"}</li>
                        <li><span className="text-md text-slate-700">Domaine :</span> {user.company.catchPhrase ?? "-"}</li>
                        <li><span className="text-md text-slate-700">bs :</span> {user.company.bs ?? "-"}</li>
                      </ul>
                    
                  </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Tel : {user.phone ?? "Non renseigné"}</span>
                    <span>Site web : {user.website ?? "Non renseigné"}</span>
                    <span className="font-medium text-rose-500">#{user.id ?? "N/A"}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ListUsers
