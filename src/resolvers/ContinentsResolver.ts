import {
  Resolver,
  Query,
  Arg,
  Mutation,
} from "type-graphql";
import Continent, { NewContinentInput } from "../entities/Continent";

@Resolver(Continent)
class ContinentsResolver {
  @Query(() => [Continent])
  async continents() {
    return await Continent.find();
  }

  @Mutation(() => Continent)
  async createContinent(
    @Arg("data") data: NewContinentInput,
  ) {
    const newContinent = new Continent();

    Object.assign(newContinent, data);

    const { id } = await newContinent.save();

    return Continent.findOne({
      where: { id }
    });
  }
}

export default ContinentsResolver;
