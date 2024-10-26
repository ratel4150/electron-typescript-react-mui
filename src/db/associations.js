// src/db/associations.js

/* import Audit from "./models/Audit.js";
import CashClosure from "./models/CashClosure.js";
import Cashier from "./models/Cashier.js";
import Customer from "./models/Customer.js";
import CustomerHistory from "./models/CustomerHistory.js";
import GeneralConfiguration from "./models/GeneralConfiguration.js";
import Invoice from "./models/Invoice.js";
import LoyaltyProgram from "./models/LoyaltyProgram.js";
import Product from "./models/Product.js";
import Role from "./models/Role.js";
import Sales from "./models/Sales.js";
import Service from "./models/Service.js";
import ServiceInventory from "./models/ServiceInventory.js";
import TaxConfiguration from "./models/TaxConfiguration.js";
import Ticket from "./models/Ticket.js";
import TicketDetail from "./models/TicketDetail.js";
import User from "./models/User.js"; */

const initAssociations = (models) => {
  console.log(models);
  
  
  const { User, Cashier, Customer, Ticket, TicketDetail, Product, Audit, LoyaltyProgram, LoyaltyTransaction, Service, ServiceInventory, CustomerHistory, Role, Sales, CashClosure, GeneralConfiguration, TaxConfiguration,Invoice } = models;


   // Make sure User and Cashier are defined properly as Sequelize instances
   if (!User || !Cashier) {
    throw new Error('User or Cashier model is not defined');
  }
  
  // Usuario y Cajero
  User.hasMany(Cashier, { foreignKey: 'usuarioId' });
  Cashier.belongsTo(User, { foreignKey: 'usuarioId' });

  // Cliente y Ticket
  Customer.hasMany(Ticket, { foreignKey: 'clienteId' });
  Ticket.belongsTo(Customer, { foreignKey: 'clienteId' });

  // Ticket y Detalle del Ticket
  Ticket.hasMany(TicketDetail, { foreignKey: 'ticketId' });
  TicketDetail.belongsTo(Ticket, { foreignKey: 'ticketId' });

  // Detalle del Ticket y Producto
  TicketDetail.belongsTo(Product, { foreignKey: 'productoId' });
  Product.hasMany(TicketDetail, { foreignKey: 'productoId' });

  // Factura y Ticket
  Invoice.belongsTo(Ticket, { foreignKey: 'ticketId' });

  // Auditoría y Usuario
  User.hasMany(Audit, { foreignKey: 'usuarioId' });
  Audit.belongsTo(User, { foreignKey: 'usuarioId' });

  // Programa de Lealtad y Transacción de Lealtad
  LoyaltyProgram.hasMany(LoyaltyTransaction, { foreignKey: 'programaId' });
  LoyaltyTransaction.belongsTo(LoyaltyProgram, { foreignKey: 'programaId' });

  // Servicio y Inventario de Servicios
  Service.hasMany(ServiceInventory, { foreignKey: 'servicioId' });
  ServiceInventory.belongsTo(Service, { foreignKey: 'servicioId' });

  // Historial de Clientes y Cliente
  Customer.hasMany(CustomerHistory, { foreignKey: 'clienteId' });
  CustomerHistory.belongsTo(Customer, { foreignKey: 'clienteId' });

  // Rol y Usuario
  Role.hasMany(User, { foreignKey: 'rol' });
  User.belongsTo(Role, { foreignKey: 'rol' });

  // Cajero y Ventas
  Cashier.hasMany(Sales, { foreignKey: 'cashierId' });
  Sales.belongsTo(Cashier, { foreignKey: 'cashierId' });

  // Cliente y Ventas
  Customer.hasMany(Sales, { foreignKey: 'customerId' });
  Sales.belongsTo(Customer, { foreignKey: 'customerId' });

  // Ventas y Configuración General
  Sales.belongsTo(GeneralConfiguration, { foreignKey: 'generalConfigurationId' });
  
  // Configuración de Impuestos y Ventas
  Sales.belongsTo(TaxConfiguration, { foreignKey: 'taxConfigurationId' });
  
  // Corte de Caja y Ventas
  CashClosure.hasMany(Sales, { foreignKey: 'cashClosureId' });
  Sales.belongsTo(CashClosure, { foreignKey: 'cashClosureId' });

  // Otras relaciones según sea necesario
  // Puedes agregar más relaciones aquí
};

// Exporta la función como una exportación por defecto
export default initAssociations;