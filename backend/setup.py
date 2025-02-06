from setuptools import setup, find_packages

setup(
    name="n8n-backend",
    version="0.1.0",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "fastapi",
        "uvicorn",
        "psycopg2",
        "python-dotenv",
        "pydantic",
        "pydantic-ai",
        "supabase"
    ],
    python_requires=">=3.8",
) 