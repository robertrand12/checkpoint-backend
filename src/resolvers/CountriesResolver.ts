import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
} from "type-graphql";
import { GraphQLError } from "graphql";
import Country, { NewCountryInput } from "../entities/Country";

@Resolver(Country)
class CountriesResolver {
  @Query(() => [Country])
  async getCountries() {
    return await Country.find({ relations: { continent: true }});
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("data") data: NewCountryInput,
  ) {
    const newCountry = new Country();

    Object.assign(newCountry, data);

    const { id } = await newCountry.save();

    return Country.findOne({
      where: { id },
      relations: { continent: true },
    });
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("countryCode", () => String) code: string) {
    const country = await Country.findOne({
      where: { code },
    });
    if (!country) throw new GraphQLError("not found");
    return country;
  }

  @Query(() => [Country])
  async getCountriesByContinent(
    @Arg("continentCode", () => String) code: string
  ) {
    const countries = await Country.find({
      where: {
        continent: {
          code: code,
        },
      },
      relations: { continent: true },
    });

    return countries;
  }
}

export default CountriesResolver;
