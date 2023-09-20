import { diContainer } from "#/di-container";
import { CreateGarageCommand } from "#/modules/garage/domain/commands/create-garage-command";
import { GetGarageByIdCommand } from "#/modules/garage/domain/commands/get-garage-part-by-id-command";
import { ListAllGaragesCommand } from "#/modules/garage/domain/commands/list-all-garage-command";
import { GarageRepository } from "#/modules/garage/domain/repositories/garage-repository";
import { CreateGarageController } from "#/modules/garage/infrastructure/controllers/create-garage-controller";
import { GetGarageByIdController } from "#/modules/garage/infrastructure/controllers/get-vehicle-part-by-id-controller";
import { ListAllGaragesController } from "#/modules/garage/infrastructure/controllers/list-all-vehicle-parts-controller";
import { GarageObjection } from "#/modules/garage/infrastructure/objections/vehicle-part-objection";

// ################ Garage #################################################
diContainer.bind(GarageRepository).to(GarageObjection);

diContainer.bind(CreateGarageController).toSelf();
diContainer.bind(CreateGarageCommand).toSelf();

diContainer.bind(GetGarageByIdController).toSelf();
diContainer.bind(GetGarageByIdCommand).toSelf();

diContainer.bind(ListAllGaragesController).toSelf();
diContainer.bind(ListAllGaragesCommand).toSelf();
