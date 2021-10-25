

Migrations dry-run (simulation)
===============================
> Network name:    'rinkeby-fork'
> Network id:      4
> Block gas limit: 28929425 (0x1b96d91)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > block number:        9380216
   > block timestamp:     1632960412
   > account:             0x3938459e590d200Dfa2e139400DB95C870102f2b
   > balance:             0.485442866815427217
   > gas used:            210237 (0x3353d)
   > gas price:           2 gwei
   > value sent:          0 ETH
   > total cost:          0.000420474 ETH

   -------------------------------------
   > Total cost:         0.000420474 ETH


2_deploy_contracts.js
=====================

   Replacing 'Verifier'
   --------------------
   > block number:        9380218
   > block timestamp:     1632960419
   > account:             0x3938459e590d200Dfa2e139400DB95C870102f2b
   > balance:             0.483403230815427217
   > gas used:            992455 (0xf24c7)
   > gas price:           2 gwei
   > value sent:          0 ETH
   > total cost:          0.00198491 ETH


   Replacing 'SolnSquareVerifier'
   ------------------------------
   > block number:        9380219
   > block timestamp:     1632960463
   > account:             0x3938459e590d200Dfa2e139400DB95C870102f2b
   > balance:             0.476717330815427217
   > gas used:            3342950 (0x330266)
   > gas price:           2 gwei
   > value sent:          0 ETH
   > total cost:          0.0066859 ETH

   -------------------------------------
   > Total cost:          0.00867081 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.009091284 ETH





Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 28957620 (0x1b9dbb4)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x372eea3789c1cb957999178a8826c45b95441137d9446141c52ff7f0b2c64360
   > Blocks: 0            Seconds: 4
   > contract address:    0x479D154D38bd084eD6e1A8a0C6CBa2E875633105
   > block number:        9380220
   > block timestamp:     1632960481
   > account:             0x3938459e590d200Dfa2e139400DB95C870102f2b
   > balance:             0.485636803813614921
   > gas used:            226537 (0x374e9)
   > gas price:           1.000000008 gwei
   > value sent:          0 ETH
   > total cost:          0.000226537001812296 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000226537001812296 ETH


2_deploy_contracts.js
=====================

   Replacing 'Verifier'
   --------------------
   > transaction hash:    0xa0affa5b62aa81b2f510131359cdbee00a631d2bd574439ac410810cae226c4e
   > Blocks: 1            Seconds: 12
   > contract address:    0x3Ed729D879384a34d59AE8F168d65aa1B225732d
   > block number:        9380222
   > block timestamp:     1632960511
   > account:             0x3938459e590d200Dfa2e139400DB95C870102f2b
   > balance:             0.484598585805309177
   > gas used:            992455 (0xf24c7)
   > gas price:           1.000000008 gwei
   > value sent:          0 ETH
   > total cost:          0.00099245500793964 ETH


   Replacing 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x4a6c1135ee7dfcdc8e927bd1bf640b5d3ed6f770e32d9ef6c953e7ec527ae8e3
   > Blocks: 1            Seconds: 12
   > contract address:    0x322F5E64B12Ec4d6aC6595634F927FEe1146EE2C
   > block number:        9380223
   > block timestamp:     1632960526
   > account:             0x3938459e590d200Dfa2e139400DB95C870102f2b
   > balance:             0.480987935776423977
   > gas used:            3610650 (0x37181a)
   > gas price:           1.000000008 gwei
   > value sent:          0 ETH
   > total cost:          0.0036106500288852 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------       
   > Total cost:     0.00460310503682484 ETH   


Summary
=======
> Total deployments:   3
> Final cost:          0.004829642038637136 ETH
