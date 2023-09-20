import { diContainer } from "#/di-container";
import { CreateVehicleGarageCommand } from "#/modules/vehicle/vehicle-garage/domain/commands/create-vehicle-garage-command";
import { GetVehicleGarageByIdCommand } from "#/modules/vehicle/vehicle-garage/domain/commands/get-vehicle-garage-by-id-command";
import { ListAllVehicleGaragesCommand } from "#/modules/vehicle/vehicle-garage/domain/commands/list-all-vehicle-garage-command";
import { VehicleGarageRepository } from "#/modules/vehicle/vehicle-garage/domain/repositories/vehicle-garage-repository";

// ################ VehicleGarage #################################################
diContainer.bind(VehicleGarageRepository).to(VehicleGarageObjection);

diContainer.bind(CreateVehicleGarageController).toSelf();
diContainer.bind(CreateVehicleGarageCommand).toSelf();

diContainer.bind(GetVehicleGarageByIdController).toSelf();
diContainer.bind(GetVehicleGarageByIdCommand).toSelf();

diContainer.bind(ListAllVehicleGaragesController).toSelf();
diContainer.bind(ListAllVehicleGaragesCommand).toSelf();
