# 📇 Contacts Manager App

A modern and responsive contacts management application built with **Next.js** and **TypeScript**, featuring CRUD operations, global state management, elegant UI components, and a clean architecture.  
This project demonstrates scalable React patterns, reusable UI, store slice management, and form handling—all wrapped in a delightful UI using `shadcn/ui`.

---

## 🚀 Features

✅ Create, read, update, and delete contacts  
✅ Global state management using Redux Toolkit  
✅ Persistent contact storage  
✅ Responsive & modern UI using shadcn/ui  
✅ Dynamic avatar color generation based on initials  
✅ Form validation and editable modal dialogs  
✅ Search and filter contacts efficiently  
✅ Theming (Light / Dark)  
✅ Clean, component-driven architecture  
✅ Reusable UI building blocks

---

## 🧠 Tech Stack

| Category         | Libraries                    |
| ---------------- | ---------------------------- |
| Framework        | Next.js (App Router)         |
| Language         | TypeScript                   |
| Styling          | Tailwind CSS                 |
| UI Components    | shadcn/ui + Radix Primitives |
| State Management | Redux Toolkit                |
| Forms            | React Hook Form              |
| Icons            | Lucide React                 |

---

## 📂 Folder Structure

contacts/
│
├── features/
│ └── contacts/
│ ├── AddOrEditContact.tsx  
│ ├── ContactCard.tsx  
│ ├── ContactList.tsx  
│ ├── SingleContact.tsx  
│ ├── contactsSlice.ts  
│ └── useContacts.ts  
│
├── components/
│ ├── Form.tsx  
│ ├── Header.tsx  
│ ├── Modal.tsx  
│ ├── ThemeToggle.tsx  
│ └── ui/  
│
├── hooks/
│ └── useDocumentTitle.ts  
│
├── store/  
│
├── lib/
│ ├── getColorByChar.ts  
│ └── utils.ts


---

## 🛠️ Installation

git clone https://github.com/abdolhamidbarfi/contacts-list.git
cd contacts
npm install
npm run dev

App runs on http://localhost:3000

---

## 🔍 Search & Filter

Contacts can be searched by:

- name
- email
- phone

Logic handled in custom hooks.
