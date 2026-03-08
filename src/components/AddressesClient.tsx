"use client";

import { useState, useTransition } from "react";
import { saveAddress, updateAddress, deleteAddress, setDefaultAddress } from "@/actions/address";

type Address = {
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string | null;
    isDefault: boolean;
};

const EMPTY_FORM = { name: "", phone: "", address: "", city: "", state: "", pincode: "", landmark: "" };

function AddressForm({
    initial,
    onSave,
    onCancel,
}: {
    initial?: typeof EMPTY_FORM;
    onSave: (data: typeof EMPTY_FORM) => Promise<void>;
    onCancel: () => void;
}) {
    const [form, setForm] = useState(initial ?? EMPTY_FORM);
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
            setError("Please fill in all required fields.");
            return;
        }
        setError("");
        startTransition(async () => {
            try { await onSave(form); } catch { setError("Something went wrong. Try again."); }
        });
    };

    const field = (key: keyof typeof EMPTY_FORM, label: string, placeholder: string, required = true) => (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {label}{required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <input
                value={form[key]}
                onChange={e => set(key, e.target.value)}
                placeholder={placeholder}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
            />
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 bg-slate-800/60 rounded-2xl border border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field("name", "Recipient Name", "Full name")}
                {field("phone", "Phone Number", "+91 XXXXX XXXXX")}
            </div>
            {field("address", "Street Address", "House / Flat / Block, Street")}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {field("city", "City", "City")}
                {field("state", "State", "State")}
                {field("pincode", "Pincode", "6-digit pincode")}
            </div>
            {field("landmark", "Landmark", "Near school, mosque, etc.", false)}
            {error && <p className="text-xs text-red-400">{error}</p>}
            <div className="flex gap-3 pt-1">
                <button
                    type="submit"
                    disabled={pending}
                    className="bg-primary hover:bg-amber-400 disabled:opacity-50 text-black font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
                >
                    {pending ? "Saving…" : "Save Address"}
                </button>
                <button type="button" onClick={onCancel} className="px-6 py-2.5 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-xl transition-colors">
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default function AddressesClient({ addresses: initial, userId }: { addresses: Address[]; userId: string }) {
    const [addresses, setAddresses] = useState(initial);
    const [showAdd, setShowAdd] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [, startTransition] = useTransition();

    const handleSave = async (data: typeof EMPTY_FORM) => {
        await saveAddress(data);
        setShowAdd(false);
        // Refresh via router or optimistic update — just reload
        window.location.reload();
    };

    const handleUpdate = (id: string) => async (data: typeof EMPTY_FORM) => {
        await updateAddress(id, data);
        setEditId(null);
        window.location.reload();
    };

    const handleDelete = (id: string) => {
        if (!confirm("Delete this address?")) return;
        startTransition(async () => {
            await deleteAddress(id);
            setAddresses(a => a.filter(x => x.id !== id));
        });
    };

    const handleSetDefault = (id: string) => {
        startTransition(async () => {
            await setDefaultAddress(id);
            setAddresses(a => a.map(x => ({ ...x, isDefault: x.id === id })));
        });
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined !text-[20px] text-primary">location_on</span>
                        <h2 className="font-bold text-white">Saved Addresses</h2>
                    </div>
                    {!showAdd && (
                        <button
                            onClick={() => setShowAdd(true)}
                            className="flex items-center gap-1.5 text-xs font-bold text-black bg-primary hover:bg-amber-400 px-4 py-2 rounded-xl transition-all"
                        >
                            <span className="material-symbols-outlined !text-[15px]">add</span>
                            Add New
                        </button>
                    )}
                </div>

                <div className="p-5 flex flex-col gap-4">
                    {showAdd && (
                        <AddressForm onSave={handleSave} onCancel={() => setShowAdd(false)} />
                    )}

                    {addresses.length === 0 && !showAdd && (
                        <div className="flex flex-col items-center text-center gap-4 py-12">
                            <span className="material-symbols-outlined !text-5xl text-slate-700">home_pin</span>
                            <h3 className="text-lg font-bold text-white">No saved addresses yet</h3>
                            <p className="text-slate-400 text-sm max-w-sm">Add a shipping address to speed up checkout.</p>
                            <button
                                onClick={() => setShowAdd(true)}
                                className="mt-2 bg-primary hover:bg-amber-400 text-black font-bold py-2.5 px-8 rounded-xl transition-all text-sm"
                            >
                                Add Address
                            </button>
                        </div>
                    )}

                    {addresses.map(addr => (
                        <div key={addr.id} className={`rounded-2xl border ${addr.isDefault ? "border-primary/40 bg-primary/5" : "border-slate-700 bg-slate-800/40"} overflow-hidden`}>
                            {editId === addr.id ? (
                                <div className="p-4">
                                    <AddressForm
                                        initial={{ name: addr.name, phone: addr.phone, address: addr.address, city: addr.city, state: addr.state, pincode: addr.pincode, landmark: addr.landmark ?? "" }}
                                        onSave={handleUpdate(addr.id)}
                                        onCancel={() => setEditId(null)}
                                    />
                                </div>
                            ) : (
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-3 flex-wrap">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-bold text-white text-sm">{addr.name}</p>
                                                {addr.isDefault && (
                                                    <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-full">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-400">{addr.phone}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {!addr.isDefault && (
                                                <button
                                                    onClick={() => handleSetDefault(addr.id)}
                                                    className="text-xs text-slate-400 hover:text-primary border border-slate-700 hover:border-primary/40 px-3 py-1.5 rounded-lg transition-colors"
                                                >
                                                    Set Default
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setEditId(addr.id)}
                                                className="text-xs text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(addr.id)}
                                                className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 mt-3 text-xs text-slate-400">
                                        <span className="material-symbols-outlined !text-[14px] text-slate-500 mt-0.5 shrink-0">location_on</span>
                                        <span>
                                            {addr.address}, {addr.city}, {addr.state} – {addr.pincode}
                                            {addr.landmark ? `, Near ${addr.landmark}` : ""}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
