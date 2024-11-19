// src/db/models/index.js

import AlertConfiguration from "./AlertConfiguration.js";
import Audit from "./Audit.js";
import CashClosure from "./CashClosure.js";
import Cashier from "./Cashier.js";
import Customer from "./Customer.js";
import CustomerHistory from "./CustomerHistory.js";
import Department from "./Department.js";
import DiscountHistory from "./DiscountHistory.js";
import GeneralConfiguration from "./GeneralConfiguration.js";
import Inventory from "./Inventory.js";
import InventoryKardex from "./InventoryKardex.js";
import InventoryMovement from "./InventoryMovement.js";
import Invoice from "./Invoice.js";
import LoyaltyProgram from "./LoyaltyProgram.js";
import LoyaltyTransaction from "./LoyaltyTransaction.js";
import PaymentHistory from "./PaymentHistory.js";
import Product from "./Product.js";
import Promotion from "./Promotion.js";
import Role from "./Role.js";
import Sales from "./Sales.js";
import SalesReport from "./SalesReport.js";
import Service from "./Service.js";
import ServiceInventory from "./ServiceInventory.js";
import Session from "./Session.js";
import TaxConfiguration from "./TaxConfiguration.js";
import Ticket from "./Ticket.js";
import TicketDetail from "./TicketDetail.js";
import TrainingProgram from "./TrainingProgram.js";
import User from "./User.js";


export default (sequelize) => {
  const models = {
    Sales: Sales(sequelize),
    User: User(sequelize),
    Cashier: Cashier(sequelize),
    Customer: Customer(sequelize),
    Ticket: Ticket(sequelize),
    TicketDetail: TicketDetail(sequelize),
    Product: Product(sequelize),
    Department: Department(sequelize),
    Invoice: Invoice(sequelize),
    CashClosure: CashClosure(sequelize),
    Promotion: Promotion(sequelize),
    Inventory: Inventory(sequelize),
    InventoryMovement: InventoryMovement(sequelize),
    InventoryKardex: InventoryKardex(sequelize),
    GeneralConfiguration: GeneralConfiguration(sequelize),
    SalesReport: SalesReport(sequelize),
    LoyaltyProgram: LoyaltyProgram(sequelize),
    LoyaltyTransaction: LoyaltyTransaction(sequelize),
    PaymentHistory: PaymentHistory(sequelize),
    TaxConfiguration: TaxConfiguration(sequelize),
    Audit: Audit(sequelize),
    DiscountHistory: DiscountHistory(sequelize),
    Service: Service(sequelize),
    ServiceInventory: ServiceInventory(sequelize),
    TrainingProgram: TrainingProgram(sequelize),
    CustomerHistory: CustomerHistory(sequelize),
    AlertConfiguration: AlertConfiguration(sequelize),
    Role: Role(sequelize),
    Session: Session(sequelize),
  };

  return models;
};
