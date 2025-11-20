// // src/components/Navigation.jsx
// import { NavLink, useLocation } from 'react-router-dom'

// const navItems = [
//   { to: '/', label: 'Dashboard', icon: 'Dashboard' },
//   { to: '/categories', label: 'Categories', icon: 'Categories' },
//   { to: '/budgets', label: 'Budgets', icon: 'Budgets' },
//   { to: '/reports', label: 'Reports', icon: 'Reports' },
// ]

// export default function Navigation() {
//   const location = useLocation()

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:bg-white/95 lg:backdrop-blur-xl lg:shadow-2xl lg:z-50 lg:flex lg:flex-col">
//         <div className="p-8">
//           <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//             BudgetWise
//           </h1>
//         </div>
//         <nav className="flex-1 px-6 space-y-3">
//           {navItems.map(item => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className={({ isActive }) =>
//                 `flex items-center gap-5 px-6 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 ${
//                   isActive
//                     ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-105'
//                     : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-lg'
//                 }`
//               }
//             >
//               <span className="text-2xl">{item.icon}</span>
//               <span>{item.label}</span>
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-purple-100 shadow-2xl z-50">
//         <div className="flex justify-around items-center py-4">
//           {navItems.map(item => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className={({ isActive }) =>
//                 `flex flex-col items-center gap-1 px-5 py-3 rounded-2xl transition-all ${
//                   isActive
//                     ? 'text-purple-600 font-bold'
//                     : 'text-gray-500'
//                 }`
//               }
//             >
//               <span className="text-2xl">{item.icon}</span>
//               <span className="text-xs font-medium">{item.label}</span>
//             </NavLink>
//           ))}
//         </div>
//       </div>

//       {/* FAB - Only on Mobile */}
//       <NavLink
//         to="/"
//         className="lg:hidden fixed bottom-20 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center text-4xl font-black hover:scale-110 transition-all duration-300 z-40"
//       >
//         +
//       </NavLink>
//     </>
//   )
// }