FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app

COPY . /app

ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:5004

RUN dotnet restore ./WebApp/WebApp.csproj

EXPOSE 5004





